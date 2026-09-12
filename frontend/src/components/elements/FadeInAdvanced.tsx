import { motion, type Transition, type HTMLMotionProps } from "framer-motion";
import React, { type ReactNode, type FC } from "react";

type AnimationVariant =
    | "fadeIn"
    | "fadeInLeft"
    | "fadeInRight"
    | "fadeInUp"
    | "fadeInDown"
    | "slideInLeft"
    | "slideInRight"
    | "slideInUp"
    | "slideInDown"
    | "zoomIn"
    | "zoomOut"
    | "bounceIn"
    | "flipInX"
    | "flipInY";

interface VariantConfig {
    initial: {
        opacity?: number;
        x?: number;
        y?: number;
        scale?: number;
        rotateX?: number;
        rotateY?: number;
    };
    animate: {
        opacity?: number;
        x?: number;
        y?: number;
        scale?: number;
        rotateX?: number;
        rotateY?: number;
        transition?: Transition;
    };
}

type SupportedTag =
    | "div"
    | "section"
    | "article"
    | "span"
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "ul"
    | "li"
    | "header"
    | "footer"
    | "main"
    | "aside"
    | "nav";

type MotionComponent = React.ComponentType<HTMLMotionProps<"div">>;

// Created OUTSIDE component — no render-time creation
const motionComponents: Record<SupportedTag, MotionComponent> = {
    div: motion.div as MotionComponent,
    section: motion.section as MotionComponent,
    article: motion.article as MotionComponent,
    span: motion.span as MotionComponent,
    p: motion.p as MotionComponent,
    h1: motion.h1 as MotionComponent,
    h2: motion.h2 as MotionComponent,
    h3: motion.h3 as MotionComponent,
    h4: motion.h4 as MotionComponent,
    h5: motion.h5 as MotionComponent,
    h6: motion.h6 as MotionComponent,
    ul: motion.ul as MotionComponent,
    li: motion.li as MotionComponent,
    header: motion.header as MotionComponent,
    footer: motion.footer as MotionComponent,
    main: motion.main as MotionComponent,
    aside: motion.aside as MotionComponent,
    nav: motion.nav as MotionComponent,
};

interface FadeInAdvancedProps {
    children: ReactNode;
    variant?: AnimationVariant;
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    triggerOnce?: boolean;
    threshold?: number;
    as?: SupportedTag;
    style?: React.CSSProperties;
}

const FadeInAdvanced: FC<FadeInAdvancedProps> = ({
    children,
    variant = "fadeInLeft",
    delay = 0,
    duration = 1500,
    distance = 100,
    className = "",
    triggerOnce = true,
    threshold = 0.001,
    as: tag = "div",
    style,
}) => {
    const MotionComponent = motionComponents[tag];

    const isSlideAnimation = variant.startsWith("slideIn");
    const finalDistance = isSlideAnimation && distance === 100 ? 330 : distance;
    const finalDuration = isSlideAnimation && duration === 1500 ? 2100 : duration;

    const variants: Record<AnimationVariant, VariantConfig> = {
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
        },
        fadeInLeft: {
            initial: { opacity: 0, x: -finalDistance },
            animate: { opacity: 1, x: 0 },
        },
        fadeInRight: {
            initial: { opacity: 0, x: finalDistance },
            animate: { opacity: 1, x: 0 },
        },
        fadeInUp: {
            initial: { opacity: 0, y: finalDistance },
            animate: { opacity: 1, y: 0 },
        },
        fadeInDown: {
            initial: { opacity: 0, y: -finalDistance },
            animate: { opacity: 1, y: 0 },
        },
        slideInLeft: {
            initial: { x: -finalDistance },
            animate: { x: 0 },
        },
        slideInRight: {
            initial: { x: finalDistance },
            animate: { x: 0 },
        },
        slideInUp: {
            initial: { y: finalDistance },
            animate: { y: 0 },
        },
        slideInDown: {
            initial: { y: -finalDistance },
            animate: { y: 0 },
        },
        zoomIn: {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
        },
        zoomOut: {
            initial: { opacity: 0, scale: 1.2 },
            animate: { opacity: 1, scale: 1 },
        },
        bounceIn: {
            initial: { opacity: 0, scale: 0.3 },
            animate: {
                opacity: 1,
                scale: 1,
                transition: {
                    type: "spring",
                    bounce: 0.5,
                    duration: finalDuration / 1000,
                },
            },
        },
        flipInX: {
            initial: { opacity: 0, rotateX: 90 },
            animate: { opacity: 1, rotateX: 0 },
        },
        flipInY: {
            initial: { opacity: 0, rotateY: 90 },
            animate: { opacity: 1, rotateY: 0 },
        },
    };

    const selectedVariant = variants[variant] ?? variants.fadeInLeft;
    const { initial, animate } = selectedVariant;
    const { transition, ...animateProps } = animate;

    return (
        <MotionComponent
            className={className}
            initial={initial}
            whileInView={animateProps}
            viewport={{ once: triggerOnce, amount: threshold }}
            transition={{
                duration: finalDuration / 1000,
                delay: delay / 1000,
                ease: "easeOut",
                ...transition,
            }}
            style={style}
        >
            {children}
        </MotionComponent>
    );
};

export default React.memo(FadeInAdvanced);
export type { AnimationVariant, FadeInAdvancedProps };