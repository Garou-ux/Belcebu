using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using System.Xml;
using System.IO;
using ERP_Belcebu.Servidor;
namespace ERP_Belcebu.ReglasNegocio.Catalogos
{
    class Usuarios
    {
        #region List

        public static DataTable ListUsuarios()
        {
            DataTable dt = new DataTable();
          using (SqlConnection con  = new SqlConnection(Servidor.Servidor.Conn()))
            {
                con.Open();
                string query = "Usuarios.ListUsuarios";
                SqlCommand cmd = new SqlCommand(query,con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                dt = new DataTable();
                da.Fill(dt);

                return dt;
            }
          
        }

        #endregion

        #region Add

        public static DataTable AddUsuario(int UsuarioId, DataTable dtMaestro)
        {
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(Servidor.Servidor.Conn()))
            {
                con.Open();
                string query = "Usuarios.AddUsuario";
                SqlCommand cmd = new SqlCommand(query,con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UsuarioId", UsuarioId);
                //En caso de que no se mande informacion de los datatables, unicamente se manda la variable en blanco
                if (dtMaestro == null ) {
                    cmd.Parameters.AddWithValue("@Maestro", String.Empty);
                }
                else
                {
                    //convertimos  el datatable en xml
                    string sMaestro = "";
                    DataSet dsMaestro = new DataSet();
                    dsMaestro.DataSetName = "DocumentElement";
                    dtMaestro.TableName = "";
                }

                return dt;
            }
        }

        #endregion

        #region Get

        #endregion

    }
}
