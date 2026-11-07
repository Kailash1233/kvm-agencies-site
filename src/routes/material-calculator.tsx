import { createFileRoute } from '@tanstack/react-router'
import { CalculatorPage, calculatorHead } from '~/pages/CalculatorPage'
export const Route = createFileRoute('/material-calculator')({ head: calculatorHead, component: CalculatorPage })
