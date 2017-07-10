#! /usr/bin/env python3

import sys
import time
import threading
from tempfile import gettempdir
from os.path import abspath, dirname, join
from os import remove
from subprocess import run
from wsgiref.simple_server import make_server

from nanohttp import text, json
from restfulpy.authorization import authorize
from restfulpy.application import Application
from restfulpy.authentication import StatefulAuthenticator
from restfulpy.controllers import RootController


__version__ = '0.1.0'

HERE = abspath(dirname(__file__))
KARMA_EXECUTABLE = '%s start karma.config.js --single-run' % join(HERE, '../node_modules/karma/bin/karma')


class MockupAuthenticator(StatefulAuthenticator):
    pass


class MockupApplication(Application):
    __authenticator__ = MockupAuthenticator()
    builtin_configuration = '''
    '''

    def __init__(self):
        super().__init__(
            'lemur',
            root=Root(),
            root_path=abspath(dirname(__file__)),
            version=__version__,
        )

    def insert_basedata(self):
        pass

    def insert_mockup(self):
        pass


class Root(RootController):

    @text
    def index(self):
        return 'Index'

    @text
    @authorize
    def protected(self):
        return 'Protected'

    @json
    def version(self):
        return {
            'version': __version__
        }


if __name__ == '__main__':
    app = MockupApplication()
    app.configure()
    httpd = make_server('localhost', 0, app)

    server_url = 'http://%s:%d' % httpd.server_address
    print('Serving %s' % server_url)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    try:
        # with open(temp_file, mode='w', encoding='utf8') as address_file:
        #     address_file.write(server_url)
        server_thread.start()
        time.sleep(1)
        run([KARMA_EXECUTABLE], shell=True)
        server_thread.join()
    except KeyboardInterrupt:
        httpd.shutdown()
        httpd.server_close()

