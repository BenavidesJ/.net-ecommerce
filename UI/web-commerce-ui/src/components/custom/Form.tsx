import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../components/ui/card';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';

import { useNavigate } from 'react-router-dom';
import {
  LoginFormValues,
  loginSchema,
  RegisterFormValues,
  registerSchema,
} from '@/lib/formSchemas';
import { login, register } from '@/services/auth';
import { useAuth } from '@/context';

type AuthFormProps = {
  mode: 'login' | 'register';
};

export function AuthForm({ mode }: AuthFormProps) {
  const { authenticate } = useAuth();
  const nav = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const isLogin = mode === 'login';
  const schema = isLogin ? loginSchema : registerSchema;
  const form = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      ...(isLogin ? {} : { confirmPassword: '' }),
    },
    mode: 'onTouched',
  });

  async function onSubmit(data: LoginFormValues | RegisterFormValues) {
    setServerError(null);
    try {
      if (mode === 'login') {
        const loginData = await login({
          correo: data.email,
          password: data.password,
        });
        console.log(loginData?.isSuccess);
        if (loginData?.isSuccess) {
          authenticate(loginData!);
          nav('/dashboard', { replace: false });
        } else {
          setServerError('Error en las credenciales');
        }
      }

      if (mode === 'register') {
        await register({
          correo: data.email,
          password: data.password,
        });
      }
    } catch (error) {
      setServerError(
        `Failed to ${isLogin ? 'login' : 'register'}. Please try again.`
      );
    }
  }

  return (
    <Card className="w-[500px]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          {isLogin ? 'Login' : 'Registro'}
        </CardTitle>
        <CardDescription className="text-sm">
          {isLogin
            ? 'Ingrese sus credenciales para acceder a su cuenta'
            : 'Registre su cuenta'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Correo
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el correo"
                      {...field}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-yellow-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Ingrese su password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-yellow-400" />
                </FormItem>
              )}
            />
            {!isLogin && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Confirmar Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme su password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-yellow-400" />
                  </FormItem>
                )}
              />
            )}

            <AlertDialog open={!!serverError}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Credenciales Incorrectas</AlertDialogTitle>
                  <AlertDialogDescription>
                    Alguno de los valores ingresados son incorrectos
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => {
                      setServerError(null);
                    }}
                  >
                    Cerrar
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? isLogin
                  ? 'Ingresando...'
                  : 'Creando cuenta...'
                : isLogin
                ? 'Login'
                : 'Registro'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        {isLogin ? (
          <>
            <Button variant="link">Olvido su password?</Button>
            <Button
              variant="link"
              onClick={() => {
                nav('../registro');
              }}
            >
              Aun no tiene cuenta? Registrese aca
            </Button>
          </>
        ) : (
          <Button
            variant="link"
            onClick={() => {
              nav('../login');
            }}
          >
            Ya tiene cuenta? Ingrese
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
