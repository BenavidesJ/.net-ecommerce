﻿// <auto-generated />
using System;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(DBContext))]
    partial class DBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Backend.Entities.DetalleUsuario", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Apellido")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Direccion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MetodoPagoPreferido")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefono")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UsuarioID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("UsuarioID")
                        .IsUnique();

                    b.ToTable("detalleUsuarios");
                });

            modelBuilder.Entity("Backend.Entities.EstadoPedido", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("DescripcionEstado")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("estadoPedidos");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            DescripcionEstado = "Pendiente"
                        });
                });

            modelBuilder.Entity("Backend.Entities.Pedido", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("EstadoID")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaCreacion")
                        .HasColumnType("datetime2");

                    b.Property<float>("MontoTotal")
                        .HasColumnType("real");

                    b.Property<int>("UsuarioID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("EstadoID");

                    b.HasIndex("UsuarioID");

                    b.ToTable("pedidos");
                });

            modelBuilder.Entity("Backend.Entities.PedidoProducto", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("Cantidad")
                        .HasColumnType("int");

                    b.Property<int>("PedidoID")
                        .HasColumnType("int");

                    b.Property<int>("PresentacionProductoID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("PedidoID");

                    b.HasIndex("PresentacionProductoID");

                    b.ToTable("pedidoProductos");
                });

            modelBuilder.Entity("Backend.Entities.PresentacionProducto", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Imagen")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ProductoID")
                        .HasColumnType("int");

                    b.Property<string>("SKU")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Tamano")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("ProductoID");

                    b.ToTable("presentacionProducto");
                });

            modelBuilder.Entity("Backend.Entities.Producto", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<int>("Cantidad")
                        .HasColumnType("int");

                    b.Property<float>("Costo")
                        .HasColumnType("real");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("productos");
                });

            modelBuilder.Entity("Backend.Entities.TipoUsuario", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("DescripcionTipo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("tipoUsuarios");
                });

            modelBuilder.Entity("Backend.Entities.Usuario", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ID"));

                    b.Property<string>("Correo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TipoID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("TipoID");

                    b.ToTable("usuarios");
                });

            modelBuilder.Entity("Backend.Entities.DetalleUsuario", b =>
                {
                    b.HasOne("Backend.Entities.Usuario", "Usuario")
                        .WithOne("DetalleUsuario")
                        .HasForeignKey("Backend.Entities.DetalleUsuario", "UsuarioID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Backend.Entities.Pedido", b =>
                {
                    b.HasOne("Backend.Entities.EstadoPedido", "Estado")
                        .WithMany("Pedidos")
                        .HasForeignKey("EstadoID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Entities.Usuario", "Usuario")
                        .WithMany("Pedidos")
                        .HasForeignKey("UsuarioID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Estado");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Backend.Entities.PedidoProducto", b =>
                {
                    b.HasOne("Backend.Entities.Pedido", "Pedido")
                        .WithMany("PedidoProductos")
                        .HasForeignKey("PedidoID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Entities.PresentacionProducto", "PresentacionProducto")
                        .WithMany("PedidoProductos")
                        .HasForeignKey("PresentacionProductoID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pedido");

                    b.Navigation("PresentacionProducto");
                });

            modelBuilder.Entity("Backend.Entities.PresentacionProducto", b =>
                {
                    b.HasOne("Backend.Entities.Producto", "Producto")
                        .WithMany("Presentaciones")
                        .HasForeignKey("ProductoID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Producto");
                });

            modelBuilder.Entity("Backend.Entities.Usuario", b =>
                {
                    b.HasOne("Backend.Entities.TipoUsuario", "TipoUsuario")
                        .WithMany("Usuarios")
                        .HasForeignKey("TipoID");

                    b.Navigation("TipoUsuario");
                });

            modelBuilder.Entity("Backend.Entities.EstadoPedido", b =>
                {
                    b.Navigation("Pedidos");
                });

            modelBuilder.Entity("Backend.Entities.Pedido", b =>
                {
                    b.Navigation("PedidoProductos");
                });

            modelBuilder.Entity("Backend.Entities.PresentacionProducto", b =>
                {
                    b.Navigation("PedidoProductos");
                });

            modelBuilder.Entity("Backend.Entities.Producto", b =>
                {
                    b.Navigation("Presentaciones");
                });

            modelBuilder.Entity("Backend.Entities.TipoUsuario", b =>
                {
                    b.Navigation("Usuarios");
                });

            modelBuilder.Entity("Backend.Entities.Usuario", b =>
                {
                    b.Navigation("DetalleUsuario")
                        .IsRequired();

                    b.Navigation("Pedidos");
                });
#pragma warning restore 612, 618
        }
    }
}
