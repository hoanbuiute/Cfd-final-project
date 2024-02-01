import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenMethod from "../../utils/token";
import { message } from "antd";
import { authService } from "../../services/authService";
import { handdleGetCart } from "./cartReducer";

const initialState = {
  showModal: "",
  profile: null,
  ////State Loading
  loading: {
    login: false,
    register: false,
    getProfile: false,
  },
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    handleShowModal: (state, action) => {
      state.showModal = action.payload;
      // console.log('action---->',action );
    },
    handleCloseModal: (state) => {
      state.showModal = "";
    },
    handleLogout: (state, action) => {
      tokenMethod.remove();
      // navigate(PATHS.HOME);
      state.profile = null;
      state.showModal = "";
      message.success("Ban đã đăng xuất thành công");
    },
  },
  extraReducers: (builder) =>{
    builder

    .addCase(handleRegister.fulfilled, (state) => {
      state.loading.register = false;
    })
    .addCase(handleRegister.pending, (state) => {
      state.loading.register = true;
    })
    .addCase(handleRegister.rejected, (state) => {
      state.loading.register = false;
    })
////Hoàn thành
    .addCase(handleLogin.fulfilled, (state) => {
      state.loading.login = false;
      state.showModal = "";
      // console.log("statefulfilled",state?.loading.login)
      // console.log("1",1)
    })

    .addCase(handleLogin.pending, (state) => {
      state.loading.login = true;
    })
    .addCase(handleLogin.rejected, (state) => {
      state.loading.login = false;
    })

    // .addCase(handleGetProfile.fulfilled, (state, action) => {
    //   state.profile = action.payload;
    //   state.loading.getProfile = false;
    // })
    .addCase(handleGetProfile.pending, (state) => {
      state.loading.getProfile = true;
    })
    .addCase(handleGetProfile.rejected, (state) => {
      state.loading.getProfile = false;
    })
    .addCase(handleGetProfile.fulfilled,(state,action)=>{
 
      // ctrl + l
      // console.log('🚀action---->', action);
      state.profile = action.payload
      state.loading.getProfile = false;

    })

  }
});

export const { actions, reducer: authReducer } = authSlice;
export const {handleShowModal,handleCloseModal,handleLogout} = actions;

export default authReducer ;

/////Thunk 
export const handleLogin = createAsyncThunk(
  ///tên actions (nguyên tắc tên reducer/tên action)
 "auth/handleLogin", async (payload,{dispatch,getState}) =>{  
  // const payload = { ...loginData };
  ///xử lí api Login
  try {
    const res = await authService.login(payload);
    console.log("res", res);
    const { token: accessToken, refreshToken } = res?.data|| {};
    tokenMethod.set({
      accessToken,
      refreshToken,
    });
    // dispatch(handleCloseModal())
    dispatch(handleGetProfile())
    dispatch(handdleGetCart())
    message.success("đăng nhập thành công");
    return true;
    // if (!!tokenMethod) {
    //   // console.log("accessToken",accessToken);
    //   // console.log("refreshToken",refreshToken);
    //   //Đăng nhập lấy thông tin profile
    //   // handleGetProfile();
    //   // handleGetProfilePayment();
    //   // handleGetProfileCourse();
    //   //Đóng modal
    //   // handleCloseModal();
    // } 
  } catch (error) {
    const errorInfo = error?.response?.data;
    if (errorInfo.error === "Not Found") {
      message.error("Username hoặc password không đúng");
    }
    return thunkApi.rejectWithValue(errorInfo);
  } 
 }
)


////Register
export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async (dataRegister, thunkAPI) => {
    const { email, password } = dataRegister || {}; //detrustering  phải đúng vs backend trả về
    //Xử lí payload
    const payload = {
      firstName: "",
      lastName: "",
      email: email,
      password: password,
    };
    try {
      const registerRes = await authService.register(payload);

      if ( registerRes?.data?.id) {
        message.success("Đăng ký thành công");
        thunkAPI.dispatch(
          handleLogin({
            email: payload.email,
            password: payload.password,
          })
        );

        return true;
      } else {
        throw false
      }
    } catch (error) {
      const errorInfo = error?.response?.data;
      if (errorInfo.error === "Forbidden") {
        message.error("Email đã được đăng ký");
      }
      return thunkAPI.rejectWithValue(errorInfo);
    }
  }
);

export const handleGetProfile = createAsyncThunk(
  "auth/handleGetProfile",
  async(_,thunkAPI) =>{
    const {dispatch,getState} = thunkAPI;
    try {
      const resProfile = await authService.getProfile();
      // if (res?.data?.data) {
      //   setProfile(res.data.data);
      // }
      return resProfile?.data

    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error?.response?.data);
      // handleLogout();
    }
  }

)