import { useCallback, useState } from 'react'
import defaultFallbackImage from '../../images/fallback.png'

const OptimizedImage = ({
    src,
    srcSet,
    sizes,
    alt = '',
    className,
    fallbackImage = defaultFallbackImage,
    priority = false,
    loading,
    fetchPriority,
    decoding,
    onError,
    onLoad,
    placeholder: _placeholder,
    blurDataURL: _blurDataURL,
    ...props
}) => {
    const [failedSrc, setFailedSrc] = useState(null)
    const hasFailed = failedSrc === src
    const resolvedSrc = hasFailed ? fallbackImage : src

    const handleError = useCallback((event) => {
        if (failedSrc !== src) {
            setFailedSrc(src)
        }
        onError?.(event)
    }, [failedSrc, src, onError])

    return (
        <img
            {...props}
            alt={alt}
            className={className}
            src={resolvedSrc}
            srcSet={hasFailed ? undefined : srcSet}
            sizes={sizes}
            loading={loading ?? (priority ? 'eager' : 'lazy')}
            fetchPriority={fetchPriority ?? (priority ? 'high' : 'auto')}
            decoding={decoding ?? (priority ? 'sync' : 'async')}
            onError={handleError}
            onLoad={onLoad}
        />
    )
}

export default OptimizedImage
