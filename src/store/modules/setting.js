export default {
  namespaced: true,
  state: {
    isMobile: false,
    theme: 'dark',
    layout: 'side',
    systemName: '危险化学品安全生产风险监测预警系统',
    copyright: '2020',
    footerLinks: [
      {link: 'n', name: ''}
    ],
    multipage: true
  },
  mutations: {
    setDevice (state, isMobile) {
      state.isMobile = isMobile
    },
    setTheme (state, theme) {
      state.theme = theme
    },
    setLayout (state, layout) {
      state.layout = layout
    },
    setMultipage (state, multipage) {
      state.multipage = multipage
    }
  }
}
