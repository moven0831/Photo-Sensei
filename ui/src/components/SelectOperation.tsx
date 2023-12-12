import { Dispatch, SetStateAction } from "react";

interface SelectOperationProps {
    operation: string | null;
    setOperation: Dispatch<SetStateAction<string | null>>;
}

export default function SelectOperation(props: SelectOperationProps) {
    const { operation, setOperation } = props;
    return (
        <div className="flex flex-col mt-10">
            <label htmlFor="operations" className="block mb-2 text-sm font-medium text-gray-700">
                Select an option
            </label>
            <select
                id="operations"
                className="font-semibold text-sm text-slate-700 bg-white hover:file:bg-pink-50 rounded-lg block w-full p-2.5"
                onChange={(e) => setOperation(e.target.value)}
            >
                <option defaultValue="grayscale">Grayscale</option>
                <option value="crop">Crop</option>
            </select>
        </div>
    );
}
