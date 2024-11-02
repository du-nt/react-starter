import { create } from "zustand";
import createUserSlice, { UserState } from "./user.slice";

type BoundState = UserState;

const useBoundStore = create<BoundState>((...args) => ({
  ...createUserSlice(...args),
}));

export default useBoundStore;
