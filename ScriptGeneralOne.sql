
IF NOT EXISTS ( SELECT  *
                FROM    sys.schemas
                WHERE   name = N'Usuarios' )
    EXEC('CREATE SCHEMA [Usuarios]');
GO

if not exists (select * from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TblUsuarios' )
begin
create table TblUsuarios(
UsuarioId int identity(1,1) not null primary key,
Nombre varchar(200) not null,
Usuario varchar(200) not null,
Pwd varchar(11) not null ,
EmpresaId int not null,
Uso bit,
AlmacenId int,
RolId int not null
)
end
go

if not exists (select * from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TblUsuariosRol' )
begin
create table TblUsuariosRol(
UsuariosRolId int identity(1,1) not null primary key,
UsuariosRol varchar(50)
)
end
go
if not exists (select * from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TblEmpresa' )
begin
CREATE TABLE TblEmpresa(
	[EmpresaId] [int] IDENTITY(1,1) NOT NULL primary key,
	[Nombre] [varchar](300) NULL,
	[Calle] [varchar](500) NULL,
	[NoExterior] [int] NULL,
	[Colonia] [varchar](500) NULL,
	[Localidad] [varchar](500) NULL,
	[MunicipioId] [int] NULL,
	[EstadoId] [int] NULL,
	[CP] [int] NULL,
	[Web] [varchar](500) NULL,
	[Telefono] [int] NULL,
	[email] [varchar](200) NULL,
	[RazonSocial] [varchar](500) NULL,
	[RFC] [varchar](500) NULL,
	[Uso] [bit] NULL
	)

end
go

if not exists (select * from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TblNivelOperacion' )
begin
CREATE TABLE TblNivelOperacion(
	[NivelOperacionId] [int] IDENTITY(1,1) NOT NULL primary key,
	[Nivel] [varchar](50) NULL,
	[NivelDescripcion] [varchar](200) NULL,
	[Uso] [bit] NULL
	)
end
go

if not exists (select * from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TblSolicitudCompra' )
begin
CREATE TABLE TblSolicitudCompra(
	[SolicitudCompraId] [int] IDENTITY(1,1) NOT NULL primary key,
	[UsuarioId] [int] NOT NULL,
	[EmpresaId] [int] NOT NULL,
	[TipoServicio] [int] NOT NULL,
	[ClienteId] [int] NOT NULL,
	[FechaRequerimiento] [datetime] NULL,
	[FechaEntrega] [datetime] NULL,
	[FechaCreado] [datetime] NOT NULL,
	[EstatusId] [int] NOT NULL
	)
end

go


if not exists (select * from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TblSolicitudCompraDet' )
begin
CREATE TABLE TblSolicitudCompraDet(
	[SolicitudCompraDetId] [int] IDENTITY(1,1) NOT NULL primary key,
	[SolicitudCompraId] [int] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[NombrePieza] [varchar](500) NULL,
	[NoParte] [varchar](500) NULL,
	[Dibujo] [varchar](300) NULL,
	[RevDibujo] [varchar](50) NULL,
	[DescripcionRequerimiento] [varchar](1000) NULL,
	[ResponsableProduccionId] [int] NULL,
	[TiempoEstimadoFabricacion] [time](7) NULL,
	[FechaInicioProduccion] [datetime] NULL,
	[TipoMaterialId] [int] NOT NULL,
	[MaterialProporcionadoId] [int] NULL,
	[GrabadoEnPieza] [int] NOT NULL,
	[GrabadoEnPiezaPunzon] [int] NULL,
	[GrabadoEnPiezaCNC] [int] NULL,
	[EmpaqueId] [int] NULL,
	[EntregaRequerimientoId] [int] NULL,
	[FechaEmbarque] [datetime] NULL,
	[Embarcado] [varchar](500) NULL,
	[ResponsableCalidadId] [int] NULL,
	[FechaValidado] [datetime] NULL,
	[FechaCreado] [datetime] NULL,
	[Observaciones] [varchar](3000) NULL,
	[EstatusId] [int] NOT NULL
	)
	end
	go

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[Usuarios].[AddUsuario]') AND type in (N'P', N'PC'))
DROP PROCEDURE [Usuarios].[AddUsuario]
GO
create procedure [Usuarios].[AddUsuario]  @UsuarioId int, @Maestro xml


as begin
set nocount on;
begin try
begin tran;

declare @EmpresaUsuarioId int =(select EmpresaId from TblUsuarios where UsuarioId=@UsuarioId);
declare @Nuevo int;
-- se guardan los datos en una tabla temporal
select Maestro.col.value('UsuarioId[1]','int') UsuarioId,
@EmpresaUsuarioId EmpresaId,
Maestro.col.value('Nombre[1]','varchar(500)') Nombre,
Maestro.col.value('Usuario[1]','varchar(300)') Usuario,
Maestro.col.value('Pwd[1]','varchar(20)') Pwd,
Maestro.col.value('Uso[1]', 'bit') Uso,
Maestro.col.value('RolId[1]', 'int') RolId
Into #TmpMaestro
from @Maestro.nodes('/DocumentElement/Table1') Maestro(col)

select @Nuevo = UsuarioId FROM #TmpMaestro;

-- Guarda la Informacion
MERGE TblUsuarios as Target
using (select * from #TmpMaestro) as Source
on (Target.UsuarioId = Source.UsuarioId)
when matched then
update
set Target.EmpresaId = @EmpresaUsuarioId,
Target.Nombre = Source.Nombre,
Target.Usuario = Source.Usuario,
Target.Pwd = Source.Pwd,
Target.Uso = Source.Uso,
Target.RolId = Source.RolId
when not matched then
insert(
EmpresaId
,Nombre
,Usuario
,Pwd
,Uso
,RolId
)
values(
@EmpresaUsuarioId
,Source.Nombre
,Source.Usuario
,Source.Pwd
,Source.Uso
,Source.RolId
);


if @Nuevo = 0
select @Nuevo = @@IDENTITY;

select @Nuevo UsuarioId;


COMMIT TRAN ;
END TRY 

	BEGIN CATCH
		SELECT
			ERROR_NUMBER() AS ErrorNumber
			,ERROR_SEVERITY() AS ErrorSeverity
			,ERROR_STATE() AS ErrorState
			,ERROR_PROCEDURE() AS ErrorProcedure
			,ERROR_LINE() AS ErrorLine
			,ERROR_MESSAGE() AS ErrorMessage
			,ERROR_MESSAGE() + '( Error No:'+ Cast(ERROR_NUMBER() as varchar) + ' || SP: ' + ERROR_PROCEDURE() + ' Linea: '+ Cast(ERROR_LINE() as varchar) +')' MensajeError ;
		ROLLBACK TRAN ;

	END CATCH;

END
go

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[Usuarios].[GetUsuario]') AND type in (N'P', N'PC'))
DROP PROCEDURE [Usuarios].[GetUsuario]
GO
create procedure [Usuarios].[GetUsuario] @UsuarioId int
as begin
set nocount on;

select UsuarioId,
Nombre,
Usuario,
Pwd,
EmpresaId,
Uso,
AlmacenId,
RolId
from TblUsuarios
where UsuarioId= @UsuarioId
for xml path('registros'), ELEMENTS,root

end
go

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[Usuarios].[ListUsuarios]') AND type in (N'P', N'PC'))
DROP PROCEDURE [Usuarios].[ListUsuarios]
GO
create procedure [Usuarios].[ListUsuarios]
as begin

select UsuarioId,Nombre,Usuario,Pwd,EmpresaId,Uso,AlmacenId,RolId from TblUsuarios

end
go