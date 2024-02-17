import axiosClient from "./axiosClient";

const UserAPI = {
  // đăng nhập
  postSignIn: (query) => {
    const url = `/user/loginAdmin/${query}`;
    console.log("url:", url);
    return axiosClient.post(url);
  },

  // đăng xuất
  getLogout: () => {
    const url = `/user/logout`;
    console.log("url:", url);
    return axiosClient.get(url);
  },

  // lấy danh sách user và theo tên
  postAllData: (query) => {
    const url = `/users/${query}`;
    console.log("url:", url);
    return axiosClient.post(url);
  },

  // lấy user theo id để sửa
  getDetailData: (id) => {
    const url = `/users/user/${id}`;
    return axiosClient.get(url);
  },

  // update user
  putUpdateUser: (query) => {
    const url = `/users/putUpdateUser/${query}`;
    console.log("url:", url);
    return axiosClient.put(url);
  },

  // xóa user
  deleteUser: (id) => {
    const url = `/users/deleteUser/${id}`;
    console.log("url:", url);
    return axiosClient.delete(url);
  },

  // đăng ký
  postSignUp: (query) => {
    const url = `/users/signup/${query}`;
    return axiosClient.post(url);
  },
};

export default UserAPI;
