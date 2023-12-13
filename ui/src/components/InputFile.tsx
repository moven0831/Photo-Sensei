import { SetStateAction, Dispatch } from "react";

interface InputFileProps {
    image: File | null;
    setImage: Dispatch<SetStateAction<File | null>>;
}

export default function InputFile(props: InputFileProps) {
    const { setImage } = props;
    return (
        <div className="flex flex-col mt-10">
            <label className="block mb-2 text-sm font-medium text-gray-700">Upload an image with signature</label>
            <input
                type="file"
                accept="image/jpeg"
                required
                className="block w-full text-sm text-slate-500
file:mr-4 file:py-2 file:px-4 file:rounded-md
file:border-0 file:text-sm file:font-semibold
file:bg-white file:text-gray-700
hover:file:bg-pink-50 m-auto"
                onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) setImage(files[0]);
                }}
            />
        </div>
    );
}
