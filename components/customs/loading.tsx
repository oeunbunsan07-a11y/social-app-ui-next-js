"use client"
import {
    Item,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import { loadingStore } from "@/stores/loading"

export function Loading() {
    const { isLoading } = loadingStore();
    return (
        <>
            {
                isLoading && (
                    <div className="fixed inset-0 bg-white/90 flex flex-col items-center justify-center">
                        <Item className="w-fit">
                            <ItemMedia>
                                <Spinner />
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle className="line-clamp-1">សូមមេត្តារង់ចាំ...</ItemTitle>
                            </ItemContent>
                        </Item>
                    </div>
                )
            }
        </>
    )
}
