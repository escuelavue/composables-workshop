import { onUnmounted, unref, onMounted, ref, type Ref } from 'vue'

interface IntersectionLog {
    name: string,
    when: string
}

interface Options extends IntersectionObserverInit {
    name: string,
    log?: boolean
}

type MaybeRef = HTMLElement | Ref<HTMLElement>

export const intersectionLog = ref<IntersectionLog[]>([])

export function useIntersectionObserver(target: MaybeRef | Ref<null> | null, options: Options) {
    const { name, log = true, ...intersectionOptions } = options

    const isIntersecting = ref<boolean>(false)

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isIntersecting.value = true
                if (log)
                    intersectionLog.value.push({ name, when: new Date().toISOString() })
            } else {
                isIntersecting.value = false
            }
        });
    })

    const observe = () => {
        const element = unref(target)
        if (element)
            observer.observe(element)
    }

    const disconnect = () => {
        observer.disconnect()
    }

    onMounted(() => {
        observe()
    })

    onUnmounted(() => {
        disconnect()
    })

    return {
        isIntersecting,
        observe,
        disconnect,
    }
}