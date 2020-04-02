import webapp2 as webapp
import os
import jinja2
import re

def render(tpl_path, context = {}):
    path, filename = os.path.split(tpl_path)
    return jinja2.Environment(
        loader=jinja2.FileSystemLoader(path or './')
    ).get_template(filename).render(context)

class MainPage(webapp.RequestHandler): 
  def get(self):
    # Disable the reflected XSS filter for demonstration purposes
    self.response.headers.add_header("X-XSS-Protection", "0")
    next = self.request.get('next')
    REGEXP_VALIDATION_PATTERN = '^[a-z A-Z0-9_.-]*$'
    pattern = re.compile(REGEXP_VALIDATION_PATTERN)
    match = pattern.match(next)
    if not match:
      next = ''
 
    # Route the request to the appropriate template
    if "signup" in self.request.path:
      self.response.out.write(render('signup.html',
        {'next': next}))
    elif "confirm" in self.request.path:
      self.response.out.write(render('confirm.html',
        {'next': self.request.get('next', 'welcome')}))
    else:
      self.response.out.write(render('welcome.html', {}))
     
    return
 
application = webapp.WSGIApplication([ ('.*', MainPage), ], debug=False)

def main():
    from paste import httpserver
    httpserver.serve(application, host='127.0.0.1', port='8080')

if __name__ == '__main__':
    main()
