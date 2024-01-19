// const RULES = {
//   name: [
//     {
//       required: true,
//       message: "Vui lòng điền tên",
//     },
//   ],
//   email: [
//     {
//       required: true,
//       message: "Vui lòng điền email",
//     },
//     {
//       regrex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
//       message: "Vui lòng nhập đúng định dạng email",
//     },
//   ],
//   phone: [
//     {
//       required: true,
//       message: "Vui lòng điền số điện thoại",
//     },
//     {
//       regrex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
//       message: "Vui lòng nhập đúng định dạng số điện thoại",
//     },
//   ],
//   topic: [
//     {
//       required: true,
//       message: "Vui lòng chọn khoá học",
//     },
//   ],
//   content: [
//     {
//       required: true,
//       message: "Vui lòng điền nội dung",
//     },
//   ],
// };
 
export const REGREX = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    password:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  };

export const MESSEAGE = {
  requiredEmail :"Bạn chưa điền thông tin Email",
  requiredPassword:"Vui lòng điền mật khẩu",
   email: "Bạn nhập sai định dạng Email"
}

