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
   <td><code>body</code></td>
   <td><em>string|object|Buffer</em></td>
   <td>The return from the server.</td>
   <td>OK</td>
  </tr>
  <tr>
   <td><code>headers</code></td>
   <td><em>object</em></td>
   <td colspan="2">Incoming headers returned by the server.</td>
  </tr>
  <tr></tr>
  <tr>
   <td colspan="4"><code>
{
  "server": "GitHub.com",
  "content-type": "application/json",
  "content-length": "2",
  "connection": "close",
  "status": "200 OK"
}
   </code></td>
  </tr>
 </tbody>
</table>
