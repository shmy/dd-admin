const animationData = require('@/assets/lottie/success.json')

export default (h, text) => {
  return h('p', {
    style: {
      lineHeight: '34px'
    }
  }, [
    h('lottie', {
      style: {
        // margin: '0 !important',
        display: 'inline-block',
        verticalAlign: 'middle'
      },
      props: {
        options: {
          animationData: animationData,
          loop: false,
          rendererSettings: {
            scaleMode: 'fit'
          }
        },
        height: 40,
        width: 40
      }
    }, null),
    h('span', {
      style: {
        marginLeft: '10px'
      }
    }, text)
  ])
}
