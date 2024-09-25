import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  googleId?: string;
  email?: string;
  name?: string;
  imageUrl?: string;
  count: number;
  firstName?: string;
  balance: number;
  tokenExpiry: number;
  isLoggedIn: boolean;
  threadId: string;
  showError: string;
}

const initialState: UserState = {
  googleId: "",
  email: "",
  name: "",
  imageUrl: "",
  count: 0,
  firstName: "",
  balance: 0,
  tokenExpiry: 0,
  isLoggedIn: false,
  threadId: '',
  showError: '',
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setGoogleId: (state, action: PayloadAction<string>) => {
      state.googleId = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setTokenExpiry: (state, action: PayloadAction<number>) => {
      state.tokenExpiry = action.payload;
    },
    setThreadId: (state, action) => {
      state.threadId = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setLoginDetails: (state, action) => {
      state.googleId = action.payload.googleId;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.imageUrl = action.payload.imageUrl;
      state.firstName = action.payload.firstName;
      state.count = action.payload.count;
      state.balance = action.payload.balance;
      state.threadId = action.payload.threadId;
      state.tokenExpiry = action.payload.tokenExpiry;
      state.isLoggedIn = true; 
    },
    setShowError: (state, action) => {
      state.showError = action.payload;
    },
  },
});

export const {
  setGoogleId,
  setEmail,
  setName,
  setImageUrl,
  setCount,
  setFirstName,
  setBalance,
  setTokenExpiry,
  setIsLoggedIn,
  setThreadId,
  setLoginDetails,
  setShowError,
} = userSlice.actions;

export default userSlice.reducer;
