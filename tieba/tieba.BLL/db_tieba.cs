using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UseStudio.Utilitys;
using tieba.Model;
namespace tieba.BLL
{
    public class db_tieba
    {
        public string myLogin(string user, string pwd)  //登录账户
        {
            using (db_tiebaEntities db = new db_tiebaEntities())
            {
                int c = db.user_login(user, pwd).First().Value;
                if (c == 0)
                {
                    return "NO";
                }
                else
                {
                    return "YES";
                }
            }
        }
        public void myEnroll(string user, string pwd, string phoneMail)
        {
            using (db_tiebaEntities _a = new db_tiebaEntities())
            {
                _a.user_register(Guid.NewGuid(), user, pwd, phoneMail);
            }
        }
        public void myPublish(string title, string note, string user, string mytime)
        {
            using (db_tiebaEntities _a = new db_tiebaEntities())
            {
                _a.note_input(Guid.NewGuid(), title, note, user, mytime);
            }
        }
        public void myDel(Guid id)
        {
            using (db_tiebaEntities _a = new db_tiebaEntities())
            {
                _a.note_del(id);
            }
        }
        public void myUpdata(Guid id, string note)
        {
            using (db_tiebaEntities _a = new db_tiebaEntities())
            {
                _a.note_updata(id, note);
            }
        }
        public string myTake(string id)
        {
            using (db_tiebaEntities _a = new db_tiebaEntities())
            {
                Guid nid = new Guid(id);
                return _a.note_all(nid).ToList().ToJson();

            }
        }
        public string Take_title()
        {
            using (db_tiebaEntities _a = new db_tiebaEntities())
            {
                return _a.note_title().ToList().ToJson();
            }
        }
    }
}
