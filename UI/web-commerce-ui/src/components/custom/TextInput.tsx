import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type TextInputProps = {
  labeltext: string;
  placeholder: string;
  type: string;
  icon?: any;
  ref: React.ForwardedRef<HTMLInputElement>;
};

export default function TextInput({
  labeltext,
  icon,
  placeholder,
  type,
  ref,
  ...props
}: TextInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-10">{labeltext}</Label>
      <div className="relative">
        <Input
          id={`input-${labeltext}`}
          className="peer pe-9"
          placeholder={placeholder}
          type={type}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <>{icon}</>
          </div>
        )}
      </div>
    </div>
  );
}
