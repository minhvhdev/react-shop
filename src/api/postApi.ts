import { IPost } from '@types';
import AxiosClient from './AxiosClient';

const postApi = {
  getAll: function (): Promise<IPost[]> {
    // const url = '/posts';
    // return AxiosClient.get(url);
    return new Promise((res) =>
      res([
        {
          id: 2,
          title: '8 Tác dụng của Cà Phê đối với sức khỏe con người',
          mainImgLink: 'https://live.staticflickr.com/65535/51356983548_0e0c81b300',
          content:
            '1.\\tCà phê giúp con người tỉnh táo hơn, cải thiện trí nhớ ngắn và thừa nhận việc sử dụng tốt hơn của vỏ não trước.\\r\\n2.\\tCà phê có chất chống oxy hóa và chống độc ở cấp tế bào.\\r\\n3.\\tCà phê có tác dụng làm giảm nguy cơ về bệnh gan và ngăn ngừa sỏi mật.\\r\\n4.\\tCà phê có tác dụng chống lại bệnh não hóa như tâm thần và động kinh.\\r\\n5.\\tCà phê có tác dụng chống lại bệnh mục xương và hạn chế sự kích động.\\r\\n6.\\tCà phê có tác dụng chống lại bệnh đường ruột và ung thư da.\\r\\n7.\\tCà phê có tác dụng giúp cơ thể thon nhỏ và cải thiện vóc dáng trong thể thao.\\r\\n8.\\tCà phê có tác dụng giảm nhẹ triệu chứng hen và giúp kìm hãm sự hiếu động thái quá của trẻ em.\\r\\n\\r\\n>*Trích từ Trung tâm thông tin khoa học về Cà Phê (COSIC) có trụ sở Oxford nước Anh*',
          createDate: '2021-08-05',
          numView: 100
        },
        {
          id: 1,
          title: 'Tại sao nên chọn Cà Phê Nguyên Chất Thơ Dũng?',
          mainImgLink: 'https://live.staticflickr.com/65535/51356754881_f3bd1716fb',
          content:
            'Công ty TNHH TM Cà Phê Minh Dũng ra đời vào năm 2014, có địa chỉ văn phòng đại diện và nhà xưởng tại 176 đường Nguyễn Chí Thanh, thị trấn Quảng Phú, huyện CưM’gar, tỉnh ĐăkLăk. Show-room và quán cà phê tại địa chỉ 48 đường Lê Hữu Trác, thị trấn Quảng Phú, huyện CưM’gar, tỉnh ĐăkLăk.\\r\\n\\r\\nTrải qua quá trình hình thành và phát triển với kinh nghiệm hơn 20 năm trong nghề làm cà phê nhân xô xuất khẩu của đội ngũ nhân sự, công ty đã chọn mặt hàng chủ đạo là đặc sản của địa phương để chế biến sâu tạo thành sản phẩm, thành phẩm có tên Cà Phê Nguyên Chất Thơ Dũng CưM’gar. Công ty đã tuân thủ nghiêm ngặt ở khâu chọn nguyên liệu – là những hạt cà phê Robusta, Arabica thu hái 100% từ những quả đỏ chín mọng đạt tiêu chuẩn xuất khẩu, đạt tiêu chuẩn cơ lí và lí hóa ở mức cao nhất. \\r\\n\\r\\n![Cà phê chín đỏ](https://live.staticflickr.com/65535/51357490884_013a8beb40_w.jpg)\\r\\n*Những hạt cà phê chín đỏ*\\r\\n\\r\\n![Hạt cà nhân cà phê](https://live.staticflickr.com/65535/51356983453_4638f2715a_w.jpg)\\r\\n*Những hạt nhân cà phê được phơi khô*\\r\\n\\r\\nNhững hạt cà phê thơm ngon này được rang bằng củi cà phê theo qui cách truyền thống (Đây là cách rang khó mà chỉ những người thợ lành nghề mới thực hiện được). Cách rang này cho ra lò những mẻ cà phê quyện đậm chất lửa hồng từ củi của thân cây cà phê già thơm nức, đó là quá trình chuyển hóa từ những hạt cà phê màu vàng nhạt thành những hạt cà phê chín giòn, đậm mùi đặc trưng riêng – mùi của hạt cà phê, mùi của khói lửa, mùi của củi khô cây cà phê, mùi của núi rừng Tây Nguyên… \\r\\n\\r\\n![Củi rang cà phê](https://live.staticflickr.com/65535/51356983513_aa08d627ba_w.jpg "Title")\\r\\n*Củi dùng để rang cà phê*\\r\\n\\r\\nChất lượng của những hạt cà phê rang củi này đã được kiểm nghiệm qua Bộ Y Tế - Viện vệ sinh dịch tễ Tây Nguyên và được khẳng định qua các chứng nhận, giải thưởng (Cúp vàng vì Sức khỏe cộng động tại Hội chợ triển lãm chuyên ngành cà phê – Lễ hội Cà Phê Buôn Ma Thuột lần thứ VI và Liên Hoan Văn Hóa Cồng Chiêng Tây Nguyên năm 2017, Đạt TOP 100 Thương Hiệu Nhãn Hiệu Nổi Tiếng năm 2013, Đạt 3 Sao OCOP năm 2020).\\r\\n\\r\\n![Phiếu kết quả thử nghiệm](https://live.staticflickr.com/65535/51356012707_832fc35203.jpg)\\r\\n*Kết quả thử nghiệm chất lượng cà phê*\\r\\n\\r\\n![Chứng nhận và cúp](https://live.staticflickr.com/65535/51356984193_b172874bdc_w.jpg)\\r\\n*Chứng nhận chất lượng và cúp*\\r\\n\\r\\n![Chứng nhận 3 sao](https://live.staticflickr.com/65535/51357767940_fa217d1882_w.jpg)\\r\\n*Chứng nhận 3 sao*\\r\\n\\r\\nHiên nay công ty chúng tôi đang hoàn thiện chứng nhận HACCP 22000 (ISO) với mong muốn hướng tới sản phẩm Cà Phê Nguyên Chất Thơ Dũng CưM’gar được bày bán trên khắp các cửa hàng, siêu thi trên toàn cả nước và tiến đến xuất khẩu. Ly cà phê rang củi Thơ Dũng có màu nâu cánh gián, đậm đà hương vị với hàm lượng caffein cao chứa nhiều các loại axit, khoáng chất (photphat, sulfat, calxi, magni, natri, kali, sắt…) và vitamin (B1, B2, B3, B6, B12) tốt cho sức khỏe của người dùng (trong đó vitamin B3 làm giảm hàm lượng cholesterol trong máu – giảm nguy cơ gây đột quỵ, tắc nghẽn mạch máu). Công ty xin trân trọng gửi lời cảm ơn đến tất cả quý khách hàng đã tin dùng và ủng hộ sản phẩm Cà Phê Nguyên Chất Thơ Dũng CưM’gar!!!\\r\\n\\r\\n![Chứng nhận 3 sao](https://live.staticflickr.com/65535/51356012807_0702db2bc1_z.jpg)\\r\\n*Tổng hợp các sản phẩm cà phê Thơ Dũng*',
          createDate: '2021-08-05',
          numView: 100
        }
      ])
    );
  }
};
export default postApi;
