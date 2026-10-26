import { describe, expect, it } from 'vitest'
import router from '../index'

describe('router', () => {
  it('resolves known routes', () => {
    expect(router.resolve('/')).toMatchObject({
      name: 'home',
      meta: { title: 'Home' },
    })
    expect(router.resolve('/about')).toMatchObject({
      name: 'about',
      meta: { title: 'About' },
    })
  })

  it('resolves unknown routes to the not-found page', () => {
    expect(router.resolve('/missing-page')).toMatchObject({
      name: 'not-found',
      meta: { title: 'Page not found' },
    })
  })
})
