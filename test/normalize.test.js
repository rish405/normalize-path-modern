import test from 'node:test'
import assert from 'node:assert/strict'
import normalize from '../dist/index.mjs'

test('relative paths', () => {
  assert.equal(normalize('a/b/c'), 'a/b/c')
  assert.equal(normalize('a//b///c'), 'a/b/c')
  assert.equal(normalize('./a/b'), 'a/b')
  assert.equal(normalize('a/./b/../c'), 'a/c')
  assert.equal(normalize('./'), './')
  assert.equal(normalize('a/'), 'a/')
  assert.equal(normalize('a//b/../'), 'a/')
  assert.equal(normalize('..'), '..')
  assert.equal(normalize('../..'), '../..')
})

test('absolute posix', () => {
  assert.equal(normalize('/a/b/..'), '/a')
  assert.equal(normalize('/a//b/'), '/a/b/')
  assert.equal(normalize('/'), '/')
})

test('windows drives', () => {
  assert.equal(normalize('C:\\a\\b\\..\\'), 'C:/a/')
  assert.equal(normalize('C:/a/./b'), 'C:/a/b')
  assert.equal(normalize('C:foo\\bar\\..'), 'C:')
  assert.equal(normalize('c:/'), 'c:/')
})

test('UNC paths', () => {
  assert.equal(normalize('\\\\server\\share\\a\\..\\b'), '//server/share/b')
  assert.equal(normalize('\\\\server\\share\\'), '//server/share/')
  assert.equal(normalize('//server/share//a///b'), '//server/share/a/b')
})
