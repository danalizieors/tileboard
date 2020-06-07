import { equals, none, values } from 'ramda'
import { useState } from 'react'

type Key = string | number

const findFirstGap = (list: number[]) => {
    let index = 0
    while (true) {
        const isGap = none(equals(index), list)
        if (isGap) return index
        index++
    }
}

export const useBoundedMapper = () => {
    const [mapping, setMapping] = useState<Record<Key, number>>({})

    const insert = (key: Key) => {
        const value = findFirstGap(values(mapping))
        setMapping({
            ...mapping,
            [key]: value,
        })
        return value
    }

    const find = (key: Key) => mapping[key]

    const remove = (key: Key) => {
        const { [key]: value, ...rest } = mapping
        setMapping(rest)
        return value
    }

    return {
        insert,
        find,
        remove,
    }
}
