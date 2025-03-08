'use client'
import React from 'react'
import {
    Atom,
    CircuitBoard,
    UsersRound,
    Zap,
} from 'lucide-react'
import { EditorCanvasTypes } from '@/lib/types'

type Props = { type: EditorCanvasTypes }

const EditorCanvasIconHelper = ({ type }: Props) => {
    switch (type) {
        case 'hypothesisNode':
            return (
                <Atom
                    className="flex-shrink-0"
                    size={30}
                />
            )
        case 'targetAudienceNode':
            return (
                <UsersRound
                    className="flex-shrink-0"
                    size={30}
                />
            )
        case 'marketingChannelNode':
            return (
                <CircuitBoard
                    className="flex-shrink-0"
                    size={30}
                />
            )
        default:
            return (
                <Zap
                    className="flex-shrink-0"
                    size={30}
                />
            )
    }
}

export default EditorCanvasIconHelper
