import React, {
	FC,
	PropsWithChildren,
	useCallback,
	useEffect,
	useRef
} from "react";
import useWatermark from "./useWatermark";

export interface WatermarkProps extends PropsWithChildren {
	style?: React.CSSProperties;
	className?: string;
	zIndex?: string | number;
	width?: number;
	height?: number;
	rotate?: number;
	image?: string;
	content?: string | string[];
	fontStyle?: {
		color?: string;
		fontSize?: number | string;
		fontWeight?: number | string;
		fontFamily?: string;
	};
	gap?: [number, number];
	offset?: [number, number];
	getContainer?: () => HTMLElement;
}

export const Watermark: FC<WatermarkProps> = (props) => {
	const {
		className,
		style,
		zIndex,
		width,
		height,
		rotate,
		image,
		content,
		fontStyle,
		gap,
		offset
	} = props;

	const containerRef = useRef<HTMLDivElement>(null);

	const getContainer = useCallback(() => {
		return props.getContainer ? props.getContainer() : containerRef.current!;
	}, [containerRef.current, props.getContainer]);

	const { generateWatermark } = useWatermark({
		zIndex,
		width,
		height,
		rotate,
		image,
		content,
		fontStyle,
		gap,
		offset,
		getContainer
	});

	useEffect(() => {
		generateWatermark({
			zIndex,
			width,
			height,
			rotate,
			image,
			content,
			fontStyle,
			gap,
			offset,
			getContainer
		});
	}, [
		zIndex,
		width,
		height,
		rotate,
		image,
		content,
		JSON.stringify(props.fontStyle),
		JSON.stringify(props.gap),
		JSON.stringify(props.offset),
		getContainer
	]);

	return props.children ? (
		<div className={className} style={style} ref={containerRef}>
			{props.children}
		</div>
	) : null;
};
