<table>
 <thead>
  <tr>
   <th>Property</th>
   <th>Type</th>
   <th>Description</th>
   <th>Example</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td><a name="title"><strong><code>title*</code></strong></a></td>
   <td><em>string</em></td>
   <td colspan="2">Question title.</td>
  </tr>
  <tr>
   <td><a name="validation"><code>validation</code></a></td>
   <td><em>(async) function</em></td>
   <td>Validation Function.</td>
   <td>A function will throw an error if validation does not pass.

```js
const q = {
  validation(val) {
    if (!val.length) throw new Error('Name required.')
  }
}
```
  </td>
  </tr>
  <tr>
   <td><a name="postprocess"><code>postProcess</code></a></td>
   <td><em>(async) function</em></td>
   <td></td>
   <td>

```js
console.log('test')
```
</td>
  </tr>
 </tbody>
</table>
