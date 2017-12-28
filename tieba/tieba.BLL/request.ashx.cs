using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace tieba.BLL
{
    /// <summary>
    /// request 的摘要说明
    /// </summary>
    public class request : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string content = "";
            context.Response.ContentType = "text/plain";
            //context.Response.Write("Hello World");
            string ljname = context.Request["mode"];
            string[] DataArr = ljname.Split(',');
            db_tieba db = new db_tieba();
            switch (DataArr[0])
            {
                case "myLogin":
                    string DL_U = DataArr[1];
                    string DL_M = DataArr[2];
                    content = db.myLogin(DL_U, DL_M);
                    break;
                case "myEnroll":
                    string EN_U = DataArr[1];
                    string EN_M = DataArr[2];
                    string EN_P = DataArr[3];
                    db.myEnroll(EN_U, EN_M, EN_P);
                    break;
                case "myPublish":
                    db.myPublish(DataArr[1], DataArr[2], DataArr[3], DataArr[4]);
                    break;
                case "myDel":
                    Guid D_ID = new Guid(context.Request["id"]);
                    db.myDel(D_ID);
                    break;
                case "myUpdata":
                    Guid U_ID = new Guid(context.Request["id"]);
                    string G_note = context.Request["noteText"];
                    db.myUpdata(U_ID, G_note);
                    break;
                case "myTake":
                    content = db.myTake(DataArr[1]);
                    break;
                case "take_title":
                    content = db.Take_title();
                    break;
            }
            context.Response.Write(content);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}