FROM denoland/deno:1.30.2

EXPOSE 1993

COPY . /usr/src/eszett/
WORKDIR /usr/src/eszett
RUN deno install -qAf --unstable https://deno.land/x/denon/denon.ts

CMD ["denon", "run", "src/server.ts"]