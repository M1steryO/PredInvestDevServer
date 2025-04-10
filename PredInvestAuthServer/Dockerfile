FROM golang:1.23-alpine

WORKDIR /app

COPY . .

RUN go mod download

# Собираем бинарник
RUN go build -o PredInvest ./cmd/predinvest

EXPOSE 8082

CMD ["./PredInvest"]
