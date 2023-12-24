import { ReactNode, createContext, useContext } from "react"
import { number } from "yup"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    getProductQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => number
    decreaseCartQuantity: (id: number) => number
    removeFromCart: (id: number) => number //לבדוק אם יש צורך בזה, כי יש כבר הגדרה ב-service
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    return (
        // <ShoppingCartContext.Provider value={{}}>
        { children }
        // </ShoppingCartContext.Provider>
    )
}