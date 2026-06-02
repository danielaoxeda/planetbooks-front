"use client";

import {Plus} from "lucide-react";

interface AddBookButtonProps {
    onClick: () => void;
}

export default function AddBookButton({
                                          onClick,
                                      }: AddBookButtonProps) {

    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 bg-[#006b11] text-white px-5 py-3 rounded-xl hover:bg-[#00520d] transition"
        >
            <Plus size={18}/>

            Add Book
        </button>
    );
}