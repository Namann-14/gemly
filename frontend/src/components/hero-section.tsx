'use client';

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import RecommendationForm from '@/components/RecommendationForm'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
} as const;

export default function HeroSection() {
    return (
        <>
            <main className="overflow-hidden relative min-h-screen flex flex-col justify-center">
                {/* Mystical backgrounds */}
                <div
                    aria-hidden
                    className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block z-0 pointer-events-none">
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(260,80%,65%,.08)_0,hsla(280,80%,55%,.02)_50%,hsla(260,80%,45%,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(260,80%,65%,.06)_0,hsla(280,80%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                </div>

                <div className="hero-gradient absolute inset-0 z-0 pointer-events-none" />
                <div className="dot-grid absolute inset-0 opacity-20 z-0 pointer-events-none" />
                <div className="aura-glow w-[600px] h-[600px] bg-purple-600/5 top-[-100px] left-1/2 -translate-x-1/2 absolute z-0 pointer-events-none" />

                <section className="relative z-10">
                    <div className="relative pt-32 md:pt-40">
                        {/* Background starry image overlay */}
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 1,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: 'spring',
                                            bounce: 0.3,
                                            duration: 2,
                                        },
                                    },
                                },
                            }}
                            className="mask-y-from-35% mask-y-to-90% absolute inset-0 top-56 lg:top-12 z-0 pointer-events-none opacity-40">
                            <Image
                                src="https://images.unsplash.com/photo-1662285064441-bedb11ca7e47?q=80&w=1344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="background"
                                className="hidden size-full mix-blend-overlay dark:block"
                                width="3276"
                                height="4095"
                            />
                        </AnimatedGroup>

                        <div className="mx-auto max-w-7xl px-6 relative z-10">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <Link
                                        href="#recommend"
                                        className="hover:bg-background/20 dark:hover:border-t-purple-500/30 bg-purple-950/20 group mx-auto flex w-fit items-center gap-4 rounded-full border border-purple-500/10 p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:shadow-zinc-950">
                                        <span className="text-purple-300 text-xs tracking-wider uppercase">✨ AI-Powered Vedic Gemology</span>
                                        <span className="dark:border-background block h-4 w-0.5 border-l bg-purple-500/10"></span>

                                        <div className="bg-purple-500/20 group-hover:bg-purple-500/30 size-6 overflow-hidden rounded-full duration-500 flex items-center justify-center">
                                            <ArrowRight className="size-3 text-purple-300" />
                                        </div>
                                    </Link>
                                </AnimatedGroup>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    transition={{ type: 'spring', bounce: 0.3, duration: 1.5, delay: 0.2 }}
                                    className="mx-auto mt-8 max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl lg:mt-12 xl:text-[5.25rem] text-[#f8f8ff] font-light leading-tight">
                                    Your gemstone,
                                    <br />
                                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent font-medium">written in the stars.</span>
                                </motion.h1>
                                <TextEffect
                                    per="word"
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    delay={0.5}
                                    as="p"
                                    className="mx-auto mt-8 max-w-2xl text-balance text-sm md:text-lg text-slate-400 font-light leading-relaxed">
                                    Enter your birth details. Our Vedic engine calculates your planetary profile. AI reveals the exact gemstones your chart is calling for — and exactly why.
                                </TextEffect>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row">
                                    <div
                                        key={1}
                                        className="bg-purple-500/10 rounded-full border border-purple-500/20 p-0.5">
                                        <Button
                                            render={<Link href="#recommend" />}
                                            size="lg"
                                            className="rounded-full px-6 text-sm font-medium btn-celestial border-0 text-white shadow-lg shadow-purple-900/40">
                                            <span className="text-nowrap">Get Your Reading</span>
                                        </Button>
                                    </div>
                                    <Button
                                        key={2}
                                        render={<Link href="/how-it-works" />}
                                        size="lg"
                                        variant="ghost"
                                        className="h-10.5 rounded-full px-6 border border-purple-500/20 text-slate-300 hover:text-white hover:bg-purple-500/10">
                                        <span className="text-nowrap">How It Works →</span>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>

                        {/* Interactive App Screen - Multi-Step Form Dashboard Frame */}
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative mx-auto mt-16 md:mt-24 px-4 max-w-7xl pb-16 md:pb-24">
                                <div className="inset-shadow-2xs ring-background bg-[#0e0b1c]/75 border border-purple-500/15 relative mx-auto max-w-6xl overflow-hidden rounded-3xl p-6 md:p-10 shadow-2xl shadow-black/80 ring-1 backdrop-blur-xl">
                                    <div className="absolute top-3 left-4 flex gap-1.5 pointer-events-none">
                                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                                    </div>
                                    <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 tracking-wider uppercase pointer-events-none">
                                        Vedic Astrolabe Dashboard
                                    </div>
                                    <div className="mt-4">
                                        <RecommendationForm isEmbedded={true} />
                                    </div>
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
            </main>
        </>
    )
}
