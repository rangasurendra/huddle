import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export function useD3(
  renderFn: (selection: d3.Selection<SVGSVGElement, unknown, null, undefined>) => void,
  dependencies: React.DependencyList
) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (ref.current) {
      const selection = d3.select(ref.current)
      renderFn(selection)
    }
  }, dependencies)

  return ref
}
