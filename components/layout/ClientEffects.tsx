"use client";
import useTextAnimation2 from "@/util/useTextAnimation2";
import useTextAnimation3 from "@/util/useTextAnimation3";
import { DataBg } from "@/util/data-bg";
export default function ClientEffects() {
    useTextAnimation2();
    useTextAnimation3();
    DataBg();
    return null;
}
