"use client";

import Image from "next/image";
import logos from "@/assets/task.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

type Task = {
    id: string;
    title: string;
    detail: string;
    is_completed: boolean;
    image_url: string;
    created_at: string;
    update_at: string;
}

export default function Page() {
    // สร้างตัวแปร state เพื่อเก็บข้อมูล
    const [tasks, setTasks] = useState<Task[]>([]);

    // เมื่อเพจถูกโหลด ให้ดึงข้อมูลจาก Supabase เพื่อมาแสดงที่หน้าเพจ
    useEffect(() => {
        async function fetchTasks() {
            const { data, error } = await supabase
                .from("task_tb")
                .select("id, title, detail, is_completed, image_url, created_at, update_at")
                .order("created_at", { ascending: false });

            if (error) {
                alert("พบปัญหาในการดึงข้อมูล Supabase");
                console.log(error.message);
                return;
            }
            // ไม่พบ error
            if (data) {
                setTasks(data as Task[]);
            }
        }
    })

    // สร้างฟังก์ชันสำหรับลบข้อมูลออกจากตาราง task_tb
    async function handleDeleteTaskClick(id: string, image_url: string) {
        // แสดง Confirm dialog ก่อนลบข้อมูล
        if (!confirm("คุณต้องการลบข้อมูลใช่หรือไม่")) {
            // ลบรูปออกจาก Storage (ถ้ามีรูป)
            const image_name = image_url?.split("/").pop() as string;

            const { data, error } = await supabase.storage
                .from('task_bk')
                .remove([image_name]);
            if (error) {
                alert("พบปัญหาในการลบรูปภาพจาก Supabase");
                console.log(error.message);
                return;
            }
        }

        // ลบขอมูลออกจากตารางใน supabase  
        const { data, error } = await supabase
            .from('task_tb')
            .delete()
            .eq('id', id);

        if (error) {
            alert("พบปัญหาในการลบข้อมูลจาก Supabase");
            console.log(error.message);
            return;
        }
        // ลบข้อมูลออกจากราการที่แสดงบนหน้าจอ 
        setTasks(tasks.filter((task) => task.id !== id));


    }
    return (
        <main>
            <div className="flex flex-col w-3/4 mx-auto">
                <Image
                    src={logos}
                    alt="Logo"
                    width={100}
                    height={100}
                />
                <h1 className="text-2xl font-bold mt-10">
                    Manage Task App
                </h1>
                <h1 className="text-2xl font-bold">
                    บันทึกงานที่ต้องทำ
                </h1>
                <div className="flex justify-end">
                    <Link href="/addtask" className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 w-max rounded">
                        เพิ่มงาน
                    </Link>
                </div>
                {/* table */}
            </div>
            <table className="min-w-full border border-black text-sm">
                <thead>
                    <tr>
                        <th className="border border-black ">รูป</th>
                        <th className="border border-black ">งานที่ต้องทำ</th>
                        <th className="border border-black ">รายละเอียด</th>
                        <th className="border border-black ">สถานะ</th>
                        <th className="border border-black ">วันที่เพิ่ม</th>
                        <th className="border border-black ">วันที่แก้ไข</th>
                        <th className="border border-black ">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* วนลูปตามจำนวณข้อมูลที่อยู่ใน state: task */}
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>
                                {task.image_url ? <Image src={task.image_url} alt="Image" width={50} height={50} /> : '-'}
                            </td>
                            <td className="border border-black ">{task.title}</td>
                            <td className="border border-black ">{task.detail}</td>
                            <td className="border border-black ">{task.is_completed
                                ? <span className="text-green-500">เสร็จสิ้น</span>
                                : <span className="text-red-500">ยังไม่เสร็จสิ้น</span>}</td>
                            <td className="border border-black ">{new Date(task.created_at).toLocaleString()}</td>
                            <td className="border border-black ">{new Date(task.update_at).toLocaleString()}</td>
                            <td className="border border-black ">
                                <Link className='mr-2 text-green-500 font-bold' href={'/edittask/${task.id}'}>แก้ไข</Link>
                                <button onClick={() => handleDeleteTaskClick(task.id, task.image_url)} className='text-red-500 font-bold cursor-pointor'>ลบ</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-10">
                <Link href="/" className="text-blue-500 font-bold"> ย้อนกลับ </Link>
            </div>
        </main>
    );
}