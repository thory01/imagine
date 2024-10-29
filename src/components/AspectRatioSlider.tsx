import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { BidirectionalSlider } from '@/components/ui/bidirectional-slider'

interface AspectRatioSliderProps {
  value?: string
  baseSize?: number
  className?: string
  onChange?: (ratio: string, width: number, height: number) => void
}

const AspectRatioSlider: React.FC<AspectRatioSliderProps> = ({
  value,
  baseSize = 1024,
  className = '',
  onChange,
}) => {
  // Update to use the converted aspectData array with predefined aspect ratios
  const aspectRatios = [
    { ratio: '1:2', value: -5 },
    { ratio: '13:25', value: -4 },
    { ratio: '4:7', value: -3 },
    { ratio: '3:5', value: -2 },
    { ratio: '17:25', value: -1 },
    { ratio: '1:1', value: 0 },     // Square
    { ratio: '6:5', value: 1 },
    { ratio: '4:3', value: 2 },
    { ratio: '3:2', value: 3 },
    { ratio: '16:9', value: 4 },    // Landscape
    { ratio: '2:1', value: 5 },
  ]

  const [sliderValue, setSliderValue] = useState(aspectRatios.find((r) => r.ratio === value)?.value || 0)
  const selectedRatio = aspectRatios.find((r) => r.value === sliderValue)?.ratio || '1:1'


  const dimensions = useMemo(() => {
    const [width, height] = selectedRatio.split(':').map(Number)
    const aspectRatio = width / height

    return {
      width: height > width ? Math.round(baseSize * aspectRatio) : baseSize,
      height: height > width ? baseSize : Math.round(baseSize / aspectRatio),
    }
  }, [selectedRatio, baseSize])

  const handleSliderChange = (value: number) => {
    setSliderValue(value)
    onChange?.(aspectRatios.find((r) => r.value === value)?.ratio || '1:1',
      dimensions.width, dimensions.height)
  }

  const handleReset = () => {
    handleSliderChange(0)
  }

  return (
    <div className={`w-full max-w-md ${className} p-6 bg-gray-50 rounded-lg shadow-sm`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium text-gray-800">Aspect Ratio</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-sm text-gray-600 hover:text-gray-900 transition"
          >
            Reset
          </Button>
        </div>
      </div>

      <div style={{
        width: '100%',
        height: (baseSize / 12) + 'px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1rem',
      }}>
        <div
          className="border border-gray-300 rounded-md shadow-sm"
          style={{
            width: dimensions.width / 12,
            height: dimensions.height / 12,
          }}
        />
      </div>



      <div className="flex justify-around gap-4 mb-6">
        {['Portrait', 'Square', 'Landscape'].map((label, index) => {
          const value = [-4, 0, 4][index]  // Matching values for Portrait, Square, and Landscape
          return (
            <Button
              key={label}
              variant="outline"
              size="sm"
              className={`px-3 ${sliderValue === value ? 'bg-gray-200 text-gray-800' : 'text-gray-500'} hover:bg-gray-300`}
              onClick={() => handleSliderChange(value)}
            >
              {label}
            </Button>
          )
        })}
      </div>

      <BidirectionalSlider
        value={sliderValue}
        max={5}
        step={1}
        onValueChange={handleSliderChange}
        className="mb-4"
      />

      <div className="flex justify-between text-sm text-gray-600">
        <span>{`${dimensions.width} × ${dimensions.height}px`}</span>
        <span>{selectedRatio}</span>
      </div>
    </div>
  )
}

export default AspectRatioSlider
