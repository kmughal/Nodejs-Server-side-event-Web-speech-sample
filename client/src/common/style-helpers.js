export const toggleBackgroundClass = className =>
  document.body.classList.toggle(className)
export const addErrorClass = () => toggleBackgroundClass('error-class')
export const removeErrorClass = () => {
  if (document.body.classList.contains('error-class'))
    toggleBackgroundClass('error-class')
}
