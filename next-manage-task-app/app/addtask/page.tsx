'use client';

import { useState } from "react";
import Image from "next/image";
import logos from "@/assets/task.png";
import Link from "next/link";
export default function Page() {
    // สร้างตัวแปร state เพื่อเก็บข้อมูลที่เกดขึ้นที่หน้าจอ
    const [title, setTitle] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const [is_completed, setIs_completed] = useState<boolean>(false);
    const [image_file, setImage_file] = useState<File | null>(null);
    const [preview_file, setpreview_file] = useState<string>('');

    // ฟังก์ชั่นเลือกรูปเพื่อพรีวิวก่อนที่จะอัปโหลด
    function handleSelectImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] || null;

        setImage_file(file);
        if (file) {
            setpreview_file(URL.createObjectURL(file as Blob));
        }
    }

    // ฟังก์ชั่นอัปโหลดรูปภาพ และบันทึกข้อมูล
    async function handleUploadAndSave(e: React.FormEvent<HTMLFormElement>) {

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
                <div>
                    {/* ส่วนเพิ่มงานใหม่ */}
                    <div className="flex flex-col border border-gray-300 rounded-xl" >
                        <h1 className="text-center text-xl font-bold">เพิ่มงานใหม่</h1>
                    </div>
                    <form>
                        <div className="flex flex-col mt-5">
                            <label className="text-lg font-bold">
                                งานที่ต้องทำ
                            </label>
                            <input type="text" className="border border-gray-300 rounded-lg p-2" />
                        </div>
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-bold"> รายละเอียดงาน </label>
                    <textarea className="border border-gray-300 rounded-lg p-2">
                    </textarea>
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-bold"> อัปโหลดรูปภาพ</label>
                    <input id='fileinput' type="file" className="hidden" onChange={handleSelectImagePreview} />
                    <label htmlFor="fileinput" className="bg-blue-500 rounded-lg p-2 text-white cursor-pointer w-30 text-center">เลือกรูป</label>
                    {preview_file && (
                        <div className="mt-3">
                            <Image
                                src={preview_file}
                                alt="Preview"
                                width={100}
                                height={100}
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col mt-5">
                    <label className="text-lg font-bold"> สถานะงาน </label>
                    <select className="border border-gray-300 rounded-lg p-2">
                        <option value="0">ยังไม่เสร็จ</option>
                        <option value="1">เสร็จแล้ว</option>
                    </select>
                </div>
                <div className="flex flex-col mt-5">
                    <button className="bg-green-500 rounded-lg p-2 text-white"> บันทึกเพิ่มงาน </button>
                </div>
            </form>
            <div className="flex justify-center mt-10">
                <Link href="/alltask" className="text-blue-500">กลับไปแสดงงานทั้งหมด</Link>
            </div>
        </div>
        </main >


    );
}

