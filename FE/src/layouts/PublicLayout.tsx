import { useEffect } from "react";

import type { RootState, AppDispatch } from "@/store/index";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/store/counter/index";
import authApi from './../api/auth';
import Login from '@/features/auth/Login';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  const ConnectionBE = async () => {
    const data = await authApi.helloWorld()
    console.log("🚀 ~ data:", data)
  }

  useEffect(() => {
    // ConnectionBE()
  }, [])

  return (
    <Outlet />
  );
};

export default PublicLayout;
