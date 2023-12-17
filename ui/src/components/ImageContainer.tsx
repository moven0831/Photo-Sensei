interface ImageContainerProps {
    title: string;
    children?: JSX.Element | null;
}

export default function ImageContainer(props: ImageContainerProps) {
    return (
        <div className="flex flex-col w-4/5 pr-5">
            <div className="mt-20 mb-1 text-xl font-mono text-gray-600">{props.title}</div>
            <div className="h-96 w-full font-medium text-gray-500 border-2 border-gray-300 rounded-lg">
                {props.children}
            </div>
        </div>
    );
}
