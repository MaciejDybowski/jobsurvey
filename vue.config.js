module.exports = {
  css: {
    loaderOptions: {
      sass: {
          additionalData: `
          @import "@/styles/base.scss"
          @import "@/styles/colors.scss"
          @import "@/styles/fonts.scss"
          @import "@/styles/mixins.scss"
          @import "@/styles/breakpoints.scss"
          `
      }
    }
  }
};