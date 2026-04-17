import uvicorn


if __name__ == '__main__':
    # Use loop='none' to bypass uvicorn loop setup that imports uvloop in this environment.
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=False, loop='none')
