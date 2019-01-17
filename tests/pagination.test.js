/**
 * Created by vahid on 7/13/17.
 */

import { MockupClient } from './helpers'

describe('Pagination', function () {
  it('First page', function (done) {
    let c = new MockupClient()
    c.request('resources')
      .sort('id')
      .take(3)
      .send()
      .then(resp => {
        expect(resp.json.length).toEqual(3)
        expect(resp.json[0]['id']).toEqual(1)
        expect(resp.take).toEqual(3)
        expect(resp.skip).toEqual(0)
        expect(resp.totalCount).toEqual(10)
        expect(resp.pageIndex).toEqual(0)
        expect(resp.pageSize).toEqual(3)
        expect(resp.totalPages).toEqual(4)
        done()
      })
      .catch(done.fail)
  })

  it('Second page', function (done) {
    let c = new MockupClient()
    c.request('resources')
      .sort('id')
      .skip(3)
      .take(3)
      .send()
      .then(resp => {
        expect(resp.json.length).toEqual(3)
        expect(resp.json[0]['id']).toEqual(4)
        expect(resp.take).toEqual(3)
        expect(resp.skip).toEqual(3)
        expect(resp.totalCount).toEqual(10)
        expect(resp.pageIndex).toEqual(1)
        expect(resp.pageSize).toEqual(3)
        expect(resp.totalPages).toEqual(4)
        done()
      })
      .catch(done.fail)
  })

  it('Third page', function (done) {
    let c = new MockupClient()
    c.request('resources')
      .sort('id')
      .skip(6)
      .take(3)
      .send()
      .then(resp => {
        expect(resp.json.length).toEqual(3)
        expect(resp.json[0]['id']).toEqual(7)
        expect(resp.take).toEqual(3)
        expect(resp.skip).toEqual(6)
        expect(resp.totalCount).toEqual(10)
        expect(resp.pageIndex).toEqual(2)
        expect(resp.pageSize).toEqual(3)
        expect(resp.totalPages).toEqual(4)
        done()
      })
      .catch(done.fail)
  })

  it('Last page', function (done) {
    let c = new MockupClient()
    c.request('resources')
      .sort('id')
      .skip(9)
      .take(3)
      .send()
      .then(resp => {
        expect(resp.json.length).toEqual(1)
        expect(resp.json[0]['id']).toEqual(10)
        expect(resp.take).toEqual(3)
        expect(resp.skip).toEqual(9)
        expect(resp.totalCount).toEqual(10)
        expect(resp.pageIndex).toEqual(3)
        expect(resp.pageSize).toEqual(3)
        expect(resp.totalPages).toEqual(4)
        done()
      })
      .catch(done.fail)
  })
})
