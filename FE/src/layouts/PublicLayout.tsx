import { useEffect } from "react";

import type { RootState, AppDispatch } from "@/store/index";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/store/counter/index";
import authApi from './../api/auth';
import Login from '@/features/auth/Login';

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
    // <div>
    //   PublicLayout
    //   <div>
    //     <div>
    //       <button
    //         aria-label="Increment value"
    //         onClick={() => dispatch(increment())}
    //       >
    //         Increment
    //       </button>
    //       <span>{count}</span>
    //       <button
    //         aria-label="Decrement value"
    //         onClick={() => dispatch(decrement())}
    //       >
    //         Decrement
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <Login />
  );
};

export default PublicLayout;
