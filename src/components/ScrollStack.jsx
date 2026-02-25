import './ScrollStack.css'

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
)

const ScrollStack = ({ children, className = '' }) => {
  return (
    <div className={`scroll-stack ${className}`.trim()}>
      {children}
    </div>
  )
}

export default ScrollStack

