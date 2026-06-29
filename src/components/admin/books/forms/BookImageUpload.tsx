import { Upload } from "lucide-react";

interface Props {
    preview: string;
    onImageUpload: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

export default function BookImageUpload({
                                            preview,
                                            onImageUpload,
                                        }: Props) {

    return (
        <>
            <label
                className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer"
            >
                <Upload size={28} />

                <span>
                    Upload Book Cover
                </span>

                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onImageUpload}
                />
            </label>

            {preview && (
                <div className="flex justify-center mt-4">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-40 rounded-xl"
                    />
                </div>
            )}
        </>
    );
}