/**
 * Created by vahid on 7/9/17.
 */

import { MockupClient } from './helpers'

describe('Filtering', function () {
  it('Simple filter', function (done) {
    let c = new MockupClient()
    c.request('resources')
      .filter('id', 1)
      .send()
      .then(resp => {
        expect(resp.json.length).toEqual(1)
        expect(resp.json[0]['id']).toEqual(1)
        done()
      })
      .catch(done.fail)
  })

  it('Multiple filter', function (done) {
    let c = new MockupClient()
    c.request('resources')
      .filter({ id: 1, title: 'resource1' })
      .send()
      .then(resp => {
        expect(resp.json.length).toEqual(1)
        expect(resp.json[0]['id']).toEqual(1)
        done()
      })
      .catch(done.fail)
  })

  it('Smaller than filter', function (done) {
    let c = new MockupClient()
    c.request('resources')
      .filter('id', '<5')
      .send()
      .then(resp => {
        expect(resp.json.length).toEqual(4)
        done()
      })
      .catch(done.fail)
  })

  it('Smaller than equal filter', function (done) {
    let c = new MockupClient()
    c.request('resources')
      .filter('id', '<=5')
      .send()
      .then(resp => {
        expect(resp.json.length).toEqual(5)
        done()
      })
      .catch(done.fail)
  })

  it('LIKE filter', function (done) {
    let c = new MockupClient()
    c.request('resources')
      .filter('title', '%resource%')
      .send()
      .then(resp => {
        expect(resp.json.length).toEqual(10)
        done()
      })
      .catch(done.fail)
  })

  it('ILIKE filter', function (done) {
    let c = new MockupClient()
    c.request('resources')
      .filter('title', '~%Resource%')
      .send()
      .then(resp => {
        expect(resp.json.length).toEqual(10)
        done()
      })
      .catch(done.fail)
  })

  it('BETWEEN filter', function (done) {
    let c = new MockupClient()
    c.request('resources')
      .filter('id', 'BETWEEN(2,9)')
      .send()
      .then(resp => {
        expect(resp.json.length).toEqual(8)
        done()
      })
      .catch(done.fail)
  })
})
