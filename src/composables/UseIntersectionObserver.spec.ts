import { it, describe, expect, vi, afterEach, afterAll, beforeAll } from "vitest"
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { useIntersectionObserver, intersectionLog } from '@/composables/UseIntersectionObserver'

const IntersectionObserver = window.IntersectionObserver

const targetElement = document.createElement('div')
const targetRef = ref(targetElement)
const options = { name: 'test', log: true }

const getComponent = () => ({
    setup() {
        const { isIntersecting } = useIntersectionObserver(targetRef, options)
        return { isIntersecting }
    },
    template: '<div></div>'
})

const observeSpy = vi.fn()
const disconnectSpy = vi.fn()

const IntersectionObserverMocked = vi.fn(() => ({
    observe: observeSpy,
    disconnect: disconnectSpy
}) as any)

beforeAll(() => {
    window.IntersectionObserver = IntersectionObserverMocked as any
})

afterEach(() => {
    vi.clearAllMocks()
})

afterAll(() => {
    window.IntersectionObserver = IntersectionObserver
})

describe('useIntersectionObserver', () => {
    it('starts and stops observing', () => {
        const wrapper = mount(getComponent())

        expect(observeSpy).toHaveBeenCalled()

        wrapper.unmount()

        expect(disconnectSpy).toHaveBeenCalled()
    })
    it('launches intersect callback and updates log file', () => {
        observeSpy.mockImplementationOnce(() => {
            const callback = (window.IntersectionObserver as any).mock.calls[0][0]
            callback([{ isIntersecting: true }], null)
        })

        const wrapper = mount(getComponent())

        expect(wrapper.vm.isIntersecting).toBe(true)

        expect(intersectionLog.value).toEqual([{ name: 'test', when: expect.any(String) }])
    })
})