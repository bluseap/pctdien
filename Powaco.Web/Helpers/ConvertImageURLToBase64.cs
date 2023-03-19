using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Powaco.Web.Helpers
{
    public class ConvertImageURLToBase64
    {			

		public static string ImageURLToBase64(String url)
        {
            StringBuilder _sb = new StringBuilder();

            Byte[] _byte = GetImage(url);

            _sb.Append(Convert.ToBase64String(_byte, 0, _byte.Length));

            return _sb.ToString();
        }

        public static byte[] GetImage(string url)
        {
			Stream stream = null;
			byte[] buf;

			try
			{
				WebProxy myProxy = new WebProxy();
				HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);

				HttpWebResponse response = (HttpWebResponse)req.GetResponse();
				stream = response.GetResponseStream();

				using (BinaryReader br = new BinaryReader(stream))
				{
					int len = (int)(response.ContentLength);
					buf = br.ReadBytes(len);
					br.Close();
				}

				stream.Close();
				response.Close();
			}
			catch (Exception exp)
			{
				buf = null;
			}

			return (buf);
		}

    }
}
