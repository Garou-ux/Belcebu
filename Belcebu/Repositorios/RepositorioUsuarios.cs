using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Belcebu.Models;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using Belcebu.Acceso_bd;


namespace Belcebu.Repositorios
{
    public class RepositorioUsuarios: IRepositorioUsuarios
    {
        SqlConnection Con = new SqlConnection(Servidor.Log);
        #region Agregar/Actualizar
        public void AgregarActualizarUsuario(Models.DatosTablas usus)
        {
            SqlCommand cm = new SqlCommand("Usuarios_AddUsuario", Con);
            cm.CommandType = CommandType.StoredProcedure;
            cm.Parameters.AddWithValue("@UsuarioId", usus.UsuarioId);
            cm.Parameters.AddWithValue("@Nombre", usus.Nombre);
            cm.Parameters.AddWithValue("@Usuario", usus.Usuario);
            cm.Parameters.AddWithValue("@Pwd", usus.Pwd);
            cm.Parameters.AddWithValue("@Empresa", usus.Empresa);
            cm.Parameters.AddWithValue("@Sucursal", usus.Sucursal);
            cm.Parameters.AddWithValue("@Activo", usus.Activo);
            cm.Parameters.AddWithValue("@FotoNombre", usus.FotoNombre);
            cm.Parameters.AddWithValue("@AlmacenId", usus.AlmacenId);
            Con.Open();
            cm.ExecuteNonQuery();
            Con.Close();
        }
        #endregion


        #region Get
        List<DatosTablas> ListaUsuarios = new List<DatosTablas>();

        //
        public List<Models.DatosTablas> GetUsuarios()
        {
            Con.Open();
            SqlCommand cmd = new SqlCommand("GetUsuarios", Con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader dr = dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                ListaUsuarios.Add(
                    new DatosTablas
                    {
                        UsuarioId = Convert.ToInt32(dr["UsuarioId"]),
                        Nombre = dr["Nombre"].ToString(),
                        Usuario = dr["Usuario"].ToString(),
                        Pwd = dr["Pwd"].ToString(),
                        Empresa = Convert.ToInt32(dr["EmpresaId"]),
                        Sucursal = Convert.ToInt32(dr["SucursalId"]),
                        Activo = Convert.ToBoolean(dr["Activo"]),
                        FotoNombre = dr["FotoNombre"].ToString(),
                        AlmacenId =  Convert.ToInt32( dr["AlmacenId"])
                    }
                    );
            };

            return ListaUsuarios;
        }
        #endregion

    }
}